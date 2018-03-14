<?php declare(strict_types = 1);

namespace PHPDish\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180314083132 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE posts_voters (post_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_639D8DB84B89032C (post_id), INDEX IDX_639D8DB8A76ED395 (user_id), PRIMARY KEY(post_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE topic_replies_voters (reply_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_A50A0A3F8A0E4E7F (reply_id), INDEX IDX_A50A0A3FA76ED395 (user_id), PRIMARY KEY(reply_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE topics_voters (topic_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_D6DE675E1F55203D (topic_id), INDEX IDX_D6DE675EA76ED395 (user_id), PRIMARY KEY(topic_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE posts_voters ADD CONSTRAINT FK_639D8DB84B89032C FOREIGN KEY (post_id) REFERENCES posts (id)');
        $this->addSql('ALTER TABLE posts_voters ADD CONSTRAINT FK_639D8DB8A76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE topic_replies_voters ADD CONSTRAINT FK_A50A0A3F8A0E4E7F FOREIGN KEY (reply_id) REFERENCES topic_replies (id)');
        $this->addSql('ALTER TABLE topic_replies_voters ADD CONSTRAINT FK_A50A0A3FA76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE topics_voters ADD CONSTRAINT FK_D6DE675E1F55203D FOREIGN KEY (topic_id) REFERENCES topics (id)');
        $this->addSql('ALTER TABLE topics_voters ADD CONSTRAINT FK_D6DE675EA76ED395 FOREIGN KEY (user_id) REFERENCES users (id)');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE posts_voters');
        $this->addSql('DROP TABLE topic_replies_voters');
        $this->addSql('DROP TABLE topics_voters');
    }
}
